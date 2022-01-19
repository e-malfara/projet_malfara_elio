<?php
use Slim\Factory\AppFactory;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Tuupola\Middleware\JwtAuthentication as JwtAuthentication;
use Firebase\JWT\JWT;

require '../vendor/autoload.php';
require_once '../bootstrap.php';

const JWT_SECRET = "guillaumeleboss";

$app = AppFactory::create();

function addHeaders($response) {
    $response = $response->withHeader("Content-Type", "application/json")
      ->withHeader("Access-Control-Allow-Origin", "https://projet-malfara-elio.herokuapp.com")
      ->withHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
      ->withHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
      ->withHeader("Access-Control-Expose-Headers", "Authorization");
  
    return $response;
}

function createJWT($response, $login) {
    $issuedAt = time();
    $expirationTime = $issuedAt + 600;
    $payload = array(
      'login' => $login,
      'iat' => $issuedAt,
      'exp' => $expirationTime
    );
  
    $token_jwt = JWT::encode($payload, JWT_SECRET, "HS256");
    $response = $response->withHeader("Authorization", "Bearer {$token_jwt}");
    return $response;
}

// Config authenticator Tuupola
$app->add(new JwtAuthentication([
    "secret" => JWT_SECRET,
    "attribute" => "token",
    "header" => "Authorization",
    "regexp" => "/Bearer\s+(.*)$/i",
    "secure" => false,
    "algorithm" => ["HS256"],

    "path" => ["/api"],
    "ignore" => ["/api/login", "/api/register", "/api/getProducts"],
    "error" => function ($response, $arguments) {
        $data = array('ERREUR' => 'Connexion', 'ERREUR' => 'JWT Non valide');
        $response = $response->withStatus(401);
        return $response->withHeader("Content-Type", "application/json")->getBody()->write(json_encode($data));
    }
]));

$app->get('/api/auth/{login}', function (Request $request, Response $response, $args) {
    $login = $args['login'];
    if ($login) 
    {
        $data["login"] = $login;
        $response = addHeaders($response);
        $response = createJWT($response, $login);
        $response->getBody()->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    }
    else {
        $response = $response->withStatus(401);
    }
    
    return $response;
});

$app->post('/api/login', function (Request $request, Response $response, $args) {
    global $entityManager;
    $body = $request->getParsedBody();
    $login = $body['login'] ?? "";
    $mdp = $body['mdp'] ?? "";

    $client = $entityManager->getRepository('Client')->findOneBy(array('login' => $login));

    if($client == null)
    {
        $data["error"] = "Il n'existe pas de compte avec ce login, veuillez vous créer un compte";
        $response = $response->withStatus(401);
        $response->getBody()->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    }
    else if($client->getPassword() != $mdp) {
        $data["error"] = "Le mot de passe est incorrect";
        $response = $response->withStatus(401);
        $response->getBody()->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    }
    else
    {
        $data["login"] = $login;
        $response = addHeaders($response);
        $response = createJWT($response, $login);
        $response->getBody()->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    }

    return $response;
});

$app->post('/api/register', function (Request $request, Response $response, $args) {
    global $entityManager;
    $body = $request->getParsedBody();
    $nom = $body['nom'] ?? "";
    $prenom = $body['prenom'] ?? "";
    $login = $body['login'] ?? "";
    $mdp = $body['mdp'] ?? "";

    $clientExistant = $entityManager->getRepository('Client')->findOneBy(array('login' => $login));

    if($clientExistant == null)
    {
        $client = new Client();
        $client->setNom($nom);
        $client->setPrenom($prenom);
        $client->setLogin($login);
        $client->setPassword($mdp);
        $entityManager->persist($client);
        $entityManager->flush();
        $response = addHeaders($response);
        $response->getBody()->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    }
    else {
        $data["error"] = "Quelqu'un possède déjà ce login, veuillez en choisir un autre";
        $response = $response->withStatus(401);
        $response->getBody()->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    }

    return $response;
});

$app->get('/api/getProducts', function (Request $request, Response $response, $args) {
    global $entityManager;

    $produits = $entityManager->getRepository('Produits')->findAll();

    if($produits != null)
    {
        $data = array();
        foreach($produits as $produit)
        {
            $infosProduit = array(
                "id_produit" => $produit->getIdProduit(),
                "nom" => $produit->getNom(),
                "dev" => $produit->getDev(),
                "note" => $produit->getNote()
            );
            array_push($data, $infosProduit);
        }
        $response = addHeaders($response);
        $response->getBody()->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    }
    else {
        $response = $response->withStatus(401);
    }

    return $response;
});

// Run app
$app->run();

?>