import React from 'react';
import _ from 'lodash';
import Webiny from 'webiny';

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
                published: _.get(this.props.data, 'published', false),
                slug: _.get(this.props.data, 'slug', '')
            }
        };

        const {Modal, Form, Grid, Select, Input, Button} = this.props;

        return (
            <Modal.Dialog>
                <Form {...formProps}>
                    {({form}) => (
                        <Modal.Content>
                            <Form.Loader/>
                            <Modal.Header title="Category" onClose={this.hide}/>
                            <Modal.Body>
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
                                            description="WARNING: This cannot be changed later."/>
                                    </Grid.Col>
                                </Grid.Row>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button type="secondary" label="Cancel" onClick={this.hide}/>
                                <Button type="primary" label="Save Category" onClick={form.submit}/>
                            </Modal.Footer>
                        </Modal.Content>
                    )}
                </Form>
            </Modal.Dialog>
        );
    }
}

export default Webiny.createComponent(CategoryModal, {modules: ['Modal', 'Form', 'Grid', 'Select', 'Input', 'Button']});