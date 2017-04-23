import Webiny from 'Webiny';

class CategoryModal extends Webiny.Ui.ModalComponent {

    renderDialog() {
        const formProps = {
            ui: 'faqCategoryForm',
            api: '/entities/faq/category',
            validateOnFirstSubmit: true,
            onSubmitSuccess: (val) => {
                this.props.showView('categoryListView')();
            },
            model: {
                id: _.get(this.props.data, 'id', null),
                title: _.get(this.props.data, 'title', ''),
                published: _.get(this.props.data, 'published', false),
                slug: _.get(this.props.data, 'slug', '')
            }
        };

        const {Modal, Form, Grid, Select, Input, Button} = this.props;

        return (
            <Modal.Dialog>
                <Modal.Header title="Category"/>
                <Modal.Body>
                    <Form {...formProps}>
                        {() => (
                            <Grid.Row>
                                <Grid.Col all={12}>
                                    <Input label="Title" name="title" validate="required" autoFocus={true}/>
                                </Grid.Col>
                                <Grid.Col all={12}>
                                    <Select label="Published" name="published">
                                        <option value={true}>Yes</option>
                                        <option value={false}>No</option>
                                    </Select>
                                </Grid.Col>
                                <Grid.Col all={12}>
                                    <Input
                                        label="Slug"
                                        name="slug"
                                        placeholder="Leave blank for automatic slug"
                                        description="This cannot be changed later."/>
                                </Grid.Col>
                            </Grid.Row>
                        )}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="secondary" label="Cancel" onClick={this.hide}/>
                    <Button type="primary" label="Save Category" onClick={this.ui('faqCategoryForm:submit')}/>
                </Modal.Footer>
            </Modal.Dialog>
        );
    }
}

export default Webiny.createComponent(CategoryModal, {modules: ['Modal', 'Form', 'Grid', 'Select', 'Input', 'Button']});