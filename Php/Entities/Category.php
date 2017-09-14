<?php

namespace Apps\Faq\Php\Entities;

use Apps\Webiny\Php\Lib\Entity\AbstractEntity;
use Apps\Webiny\Php\Lib\Entity\Indexes\IndexContainer;
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
 */
class Category extends AbstractEntity
{
    protected static $classId = 'Faq.Entities.Category';
    protected static $entityCollection = 'FaqCategory';
    protected static $entityMask = '{title}';

    public function __construct()
    {
        parent::__construct();

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
        $this->attr('articles')->one2many('category')->setEntity(Article::class);
    }

    protected static function entityIndexes(IndexContainer $indexes)
    {
        parent::entityIndexes($indexes);

        $indexes->add(new SingleIndex('published', 'published'));
        $indexes->add(new SingleIndex('slug', 'slug'));
    }
}