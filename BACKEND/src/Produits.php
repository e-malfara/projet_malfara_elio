<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Produits
 *
 * @ORM\Table(name="produits")
 * @ORM\Entity
 */
class Produits
{
    /**
     * @var int
     *
     * @ORM\Column(name="id_produit", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="produits_id_produit_seq", allocationSize=1, initialValue=1)
     */
    private $idProduit;

    /**
     * @var string|null
     *
     * @ORM\Column(name="nom", type="string", length=50, nullable=true)
     */
    private $nom;

    /**
     * @var string|null
     *
     * @ORM\Column(name="dev", type="string", length=50, nullable=true)
     */
    private $dev;

    /**
     * @var string|null
     *
     * @ORM\Column(name="note", type="decimal", precision=10, scale=0, nullable=true)
     */
    private $note;


    /**
     * Get idProduit.
     *
     * @return int
     */
    public function getIdProduit()
    {
        return $this->idProduit;
    }

    /**
     * Set nom.
     *
     * @param string|null $nom
     *
     * @return Produits
     */
    public function setNom($nom = null)
    {
        $this->nom = $nom;

        return $this;
    }

    /**
     * Get nom.
     *
     * @return string|null
     */
    public function getNom()
    {
        return $this->nom;
    }

    /**
     * Set dev.
     *
     * @param string|null $dev
     *
     * @return Produits
     */
    public function setDev($dev = null)
    {
        $this->dev = $dev;

        return $this;
    }

    /**
     * Get dev.
     *
     * @return string|null
     */
    public function getDev()
    {
        return $this->dev;
    }

    /**
     * Set note.
     *
     * @param string|null $note
     *
     * @return Produits
     */
    public function setNote($note = null)
    {
        $this->note = $note;

        return $this;
    }

    /**
     * Get note.
     *
     * @return string|null
     */
    public function getNote()
    {
        return $this->note;
    }
}
