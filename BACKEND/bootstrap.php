<?php
use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;
date_default_timezone_set('America/Lima');
require_once "vendor/autoload.php";
$isDevMode = true;
$config = Setup::createYAMLMetadataConfiguration(array(__DIR__ . "/config/yaml"), $isDevMode);
$conn = array(
'host' => 'ec2-34-253-29-48.eu-west-1.compute.amazonaws.com',
'driver' => 'pdo_pgsql',
'user' => 'alvqsqomvwsous',
'password' => '4f86007a8bc3a368685c7bcdc9e5811d9feb2f77e51042ecc6dfec5a6dfd9dd0',
'dbname' => 'ddu07024l6pueo',
'port' => '5432'
);
$entityManager = EntityManager::create($conn, $config);