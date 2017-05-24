<?php
namespace Apps\Faq\Php\Entities;

use Apps\Webiny\Php\DevTools\Entity\AbstractEntity;
use Apps\Webiny\Php\DevTools\WebinyTrait;
use Webiny\Component\Entity\EntityCollection;
use Webiny\Component\Mongo\Index\SingleIndex;

/**
 * Class Category
 *
 * @property string           $id
 * @property string           $title
 * @property string           $slug
 * @property boolean          $published
 * @property EntityCollection $articles
 *
 * @package Apps\Faq\Php\Entities
 *
 */
class Category extends AbstractEntity
{
    use WebinyTrait;

    protected static $entityCollection = 'FaqCategory';
    protected static $entityMask = '{title}';

    public function __construct()
    {
        parent::__construct();

        $this->index(new SingleIndex('published', 'published'));
        $this->index(new SingleIndex('slug', 'slug'));

        $this->attr('slug')->char()->setToArrayDefault()->setValidators('unique')->setValidationMessages([
            'unique' => 'A category with the same title already exists.'
        ]);
        $this->attr('title')->char()->setRequired(true)->setToArrayDefault()->onSet(function ($val) {
            if (!$this->slug && !$this->exists()) {
                $this->slug = $this->str($val)->slug()->val();
            }

            return $val;
        });

        $this->attr('totalArticles')->dynamic(function () {
            return Article::count(['category' => $this->id]);
        });

        $this->attr('published')->boolean()->setDefaultValue(false)->setToArrayDefault();

        $article = '\Apps\Faq\Php\Entities\Article';
        $this->attr('articles')->one2many('category')->setEntity($article);
    }
}