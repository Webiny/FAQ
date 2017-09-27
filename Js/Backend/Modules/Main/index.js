import React from 'react';
import Webiny from 'webiny';
import CategoryList from './CategoryList';
import ArticleForm from './ArticleForm';

/**
 * @i18n.namespace FAQ.Backend.Main
 */
class Main extends Webiny.App.Module {

    init() {
        this.name = 'Main';
        const role = 'faq';

        this.registerMenus(
            <Webiny.Ui.Menu label={this.i18n('FAQ')} route="Faq.Category.List" icon="fa-question-circle-o" role={role}/>
        );

        this.registerRoutes(
            new Webiny.Route('Faq.Category.List', '/faq', CategoryList, 'Faq - List').setRole(role),
            new Webiny.Route('Faq.Article.Create', '/faq/article/new/:category', ArticleForm, 'Faq - New Article').setRole(role),
            new Webiny.Route('Faq.Article.Edit', '/faq/article/:category/:id', ArticleForm, 'Faq - Edit Article').setRole(role)
        );
    }
}

export default Main;