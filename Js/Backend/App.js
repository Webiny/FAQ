import Webiny from 'Webiny';
import Main from './Modules/Main';

class Faq extends Webiny.App {
    constructor() {
        super('Faq.Backend');
        this.modules = [
            new Main(this)
        ];
    }
}

Webiny.registerApp(new Faq());