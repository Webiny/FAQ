<?php
namespace Apps\Faq\Php\Entities;

use Apps\Core\Php\DevTools\Entity\AbstractEntity;
use Apps\Core\Php\DevTools\WebinyTrait;

/**
 * Class Article
 *
 * @property string   $id
 * @property string   $title
 * @property string   $slug
 * @property Category $category
 * @property string   $content
 * @property array    $draft
 * @property boolean  $published
 * @property string   $icon
 *
 * @package Apps\TheHub\Php\Entities
 *
 */
class Article extends AbstractEntity
{
    use WebinyTrait;

    protected static $entityCollection = 'FaqArticle';
    protected static $entityMask = '{question}';

    public function __construct()
    {
        parent::__construct();

        $this->attr('question')->char()->setRequired(true)->setToArrayDefault();
        $this->attr('answer')->object()->setToArrayDefault();

        $category = '\Apps\Faq\Php\Entities\Category';
        $this->attr('category')->many2one()->setEntity($category)->setToArrayDefault();

        $author = '\Apps\Core\Php\Entities\User';
        $this->attr('author')->many2one()->setEntity($author)->setDefaultValue($this->wAuth()->getUser());

        $this->api('GET', '/')->setAuthorization(false);
        $this->api('GET', '{id}')->setAuthorization(false);

        /**
         * @api.name Returns all pages from a category
         */
        $this->api('GET', 'category/{slug}', function ($slug) {
            $articles = Category::findOne(['slug' => $slug])->articles;

            return $this->apiFormatList($articles, '*,answer');
        })->setAuthorization(false);
    }
}