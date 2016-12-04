import Webiny from 'Webiny';
const Ui = Webiny.Ui.Components;

class FaqForm extends Webiny.Ui.View {
    constructor(props) {
        super(props);

        this.continue = false;

        this.bindMethods('onSubmitSuccess', 'saveAndContinueEditing', 'save');
    }

    saveAndContinueEditing(container) {
        this.continue = true;
        container.submit();
    }

    save(container) {
        this.continue = false;
        container.submit();
    }

    onSubmitSuccess() {
        if (!this.continue) {
            Webiny.Router.goToRoute('Faq.Category.List');
        }
    }

}

FaqForm.defaultProps = {
    renderer() {
        const formProps = {
            api: '/entities/faq/articles',
            fields: '*',
            connectToRouter: true,
            onSubmitSuccess: this.onSubmitSuccess,
            onCancel: 'Faq.Category.List',
            model: {category: Webiny.Router.getParams('category')}
        };

        const categoryProps = {
            api: '/entities/faq/category',
            url: Webiny.Router.getParams('category'),
            fields: 'title'
        };

        return (
            <Ui.Data {...categoryProps}>
                {(categoryData) => {
                    return (
                        <Ui.Form {...formProps}>
                            {(data, container) => {
                                return (
                                    <Ui.View.Form>
                                        <Ui.View.Header title="Article" description={<span>Category: <strong>{categoryData.title}</strong></span>}/>

                                        <Ui.View.Body>
                                            <Ui.Grid.Row>
                                                <Ui.Grid.Col all={12}>
                                                    <Ui.Input label="Question" name="question" validate="required"/>
                                                </Ui.Grid.Col>

                                                <Ui.Grid.Col all={12}>
                                                    <div className="form-group">
                                                        <Ui.Draft.SimpleEditor name="answer"/>
                                                    </div>
                                                </Ui.Grid.Col>
                                            </Ui.Grid.Row>
                                        </Ui.View.Body>
                                        <Ui.View.Footer>
                                            <Ui.Button align="left" type="default" onClick={container.cancel} label="Go Back"/>
                                            <Ui.Button align="right" type="primary" onClick={() => this.saveAndContinueEditing(container)}
                                                       label="Save & Continue editing"/>
                                            <Ui.Button align="right" type="primary" onClick={() => this.save(container)}
                                                       label="Save & Exit"/>
                                        </Ui.View.Footer>
                                    </Ui.View.Form>
                                );
                            }}
                        </Ui.Form>
                    );
                }}
            </Ui.Data>
        );
    }
};


export default FaqForm;
