import Webiny from 'Webiny';

class ArticleList extends Webiny.Ui.View {

}

ArticleList.defaultProps = {
    renderer() {
        return (
            <Webiny.Ui.LazyLoad modules={['Grid', 'List', 'ExpandableList', 'Filters', 'Draft']}>
                {(Ui) => (
                    <Ui.Grid.Row>
                        <Ui.Grid.Col all={12}>
                            <Ui.List.Table.Empty renderIf={!this.props.data.articles.length}/>
                            <Ui.ExpandableList>
                                {this.props.data.articles.map(row => {
                                    return (
                                        <Ui.ExpandableList.Row key={row.id}>
                                            <Ui.ExpandableList.Field width={4} name="Question">{row.question}</Ui.ExpandableList.Field>
                                            <Ui.ExpandableList.Field
                                                width={2}
                                                name="Published"
                                                className="text-center">
                                                {(row.published === true ? "Yes" : "No")}
                                            </Ui.ExpandableList.Field>
                                            <Ui.ExpandableList.Field width={2} name="Author">
                                                {row.createdBy.firstName} {row.createdBy.lastName}
                                            </Ui.ExpandableList.Field>
                                            <Ui.ExpandableList.Field width={2} name="Created">
                                                <Ui.Filters.DateTime value={row.createdOn}/>
                                            </Ui.ExpandableList.Field>
                                            <Ui.ExpandableList.RowDetailsList title={row.question}>
                                                <Ui.Draft.SimpleEditor name="answer" preview={true} value={row.answer} toolbar={false}/>
                                            </Ui.ExpandableList.RowDetailsList>
                                            <Ui.ExpandableList.ActionSet>
                                                <Ui.ExpandableList.Action
                                                    label="Edit"
                                                    icon="icon-pencil"
                                                    onClick={() => Webiny.Router.goToRoute('Faq.Article.Edit', {
                                                        id: row.id,
                                                        category: this.props.data.id
                                                    })}/>
                                                <Ui.ExpandableList.Action
                                                    label="Delete"
                                                    icon="icon-cancel"
                                                    onClick={() => this.props.showView('articleConfirmDelete')(row)}/>
                                            </Ui.ExpandableList.ActionSet>
                                        </Ui.ExpandableList.Row>
                                    );
                                })}
                            </Ui.ExpandableList>
                        </Ui.Grid.Col>
                    </Ui.Grid.Row>
                )}
            </Webiny.Ui.LazyLoad>
        );
    }
};

export default ArticleList;