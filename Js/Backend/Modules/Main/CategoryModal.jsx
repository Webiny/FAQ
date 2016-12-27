import Webiny from 'Webiny';
const Ui = Webiny.Ui.Components;

class CategoryModal extends Webiny.Ui.ModalComponent {

    renderDialog() {
        const formProps = {
            api: '/entities/faq/category',
            validateOnFirstSubmit: true,
            onSubmitSuccess: (val) => {
                this.props.showView('categoryListView')();
            },
            model: {
                id: _.get(this.props.data, 'id', null),
                title: _.get(this.props.data, 'title', ''),
                slug: _.get(this.props.data, 'slug', '')
            }
        };

        return (
            <Ui.Modal.Dialog>
                <Ui.Form {...formProps}>
                    {(model, form) => (
                        <modal>
                            <Ui.Modal.Header title="Category"/>
                            <Ui.Modal.Body>
                                <Ui.Grid.Row>
                                    <Ui.Grid.Col all={12}>
                                        <Ui.Input label="Title" name="title" validate="required" autoFocus={true}/>
                                    </Ui.Grid.Col>
                                    <Ui.Grid.Col all={12}>
                                        <Ui.Input
                                            label="Slug"
                                            name="slug"
                                            placeholder="Leave blank for automatic slug"
                                            description="This cannot be changed later."/>
                                    </Ui.Grid.Col>
                                </Ui.Grid.Row>
                            </Ui.Modal.Body>
                            <Ui.Modal.Footer>
                                <Ui.Button type="secondary" label="Cancel" onClick={this.hide}/>
                                <Ui.Button type="primary" label="Save Category" onClick={form.submit}/>
                            </Ui.Modal.Footer>
                        </modal>
                    )}
                </Ui.Form>
            </Ui.Modal.Dialog>
        );
    }
}

export default CategoryModal;