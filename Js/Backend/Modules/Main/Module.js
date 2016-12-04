import Webiny from 'Webiny';
import CategoryList from './CategoryList';
import ArticleForm from './ArticleForm';

class Main extends Webiny.Module {

    init() {
        const Menu = Webiny.Ui.Menu;

        this.registerMenus(
            new Menu('FAQ', 'Faq.Category.List', 'fa-question-circle-o').setRole('faq')
        );

        this.registerRoutes(
            new Webiny.Route('Faq.Category.List', '/faq', CategoryList, 'Faq - List'),
            new Webiny.Route('Faq.Article.Create', '/faq/article/new/:category', ArticleForm, 'Faq - New Article'),
            new Webiny.Route('Faq.Article.Edit', '/faq/article/:category/:id', ArticleForm, 'Faq - Edit Article')
        );
    }
}

export default Main;