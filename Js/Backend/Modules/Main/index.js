import Webiny from 'Webiny';
import CategoryList from './CategoryList';
import ArticleForm from './ArticleForm';

class Main extends Webiny.Module {

    init() {
        this.name = 'Main';
        const Menu = Webiny.Ui.Menu;
        const role = 'faq';

        this.registerMenus(
            new Menu('FAQ', 'Faq.Category.List', 'fa-question-circle-o').setRole(role)
        );

        this.registerRoutes(
            new Webiny.Route('Faq.Category.List', '/faq', CategoryList, 'Faq - List').setRole(role),
            new Webiny.Route('Faq.Article.Create', '/faq/article/new/:category', ArticleForm, 'Faq - New Article').setRole(role),
            new Webiny.Route('Faq.Article.Edit', '/faq/article/:category/:id', ArticleForm, 'Faq - Edit Article').setRole(role)
        );
    }
}

export default Main;