import React from 'react';
import _ from 'lodash';
import Webiny from 'webiny';

/**
 * @i18n.namespace FAQ.Backend.Main.CategoryModal
 */
class CategoryModal extends Webiny.Ui.ModalComponent {

    renderDialog() {
        const formProps = {
            api: '/entities/faq/category',
            validateOnFirstSubmit: true,
            onSubmitSuccess: () => this.props.showView('categoryListView')(),
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
                            <Modal.Header title={this.i18n('Category')} onClose={this.hide}/>
                            <Modal.Body>
                                <Grid.Row>
                                    <Grid.Col all={12}>
                                        <Input label={this.i18n('Title')} name="title" validate="required" autoFocus/>
                                    </Grid.Col>
                                    <Grid.Col all={12}>
                                        <Select label={this.i18n('Published')} name="published">
                                            <option value={true}>{this.i18n('Yes')}</option>
                                            <option value={false}>{this.i18n('No')}</option>
                                        </Select>
                                    </Grid.Col>
                                    <Grid.Col all={12}>
                                        <Input
                                            label={this.i18n('Slug')}
                                            name="slug"
                                            placeholder={this.i18n('Leave blank for automatic slug')}
                                            description={this.i18n('WARNING: This cannot be changed later.')}/>
                                    </Grid.Col>
                                </Grid.Row>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button type="secondary" label={this.i18n('Cancel')} onClick={this.hide}/>
                                <Button type="primary" label={this.i18n('Save Category')} onClick={form.submit}/>
                            </Modal.Footer>
                        </Modal.Content>
                    )}
                </Form>
            </Modal.Dialog>
        );
    }
}

export default Webiny.createComponent(CategoryModal, {modules: ['Modal', 'Form', 'Grid', 'Select', 'Input', 'Button']});