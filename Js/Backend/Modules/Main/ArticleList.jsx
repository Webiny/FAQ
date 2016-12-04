import Webiny from 'Webiny';
const Ui = Webiny.Ui.Components;

class ArticleList extends Webiny.Ui.View {

}

ArticleList.defaultProps = {

    renderer() {
        return (
            <Ui.Grid.Col all={12}>
                <Ui.List.Table.Empty renderIf={!this.props.data.articles.length}/>

                <Ui.ExpandableList>
                    {this.props.data.articles.map(row => {
                        return (
                            <Ui.ExpandableList.Row key={row.id}>
                                <Ui.ExpandableList.Field all={5}
                                                         name="Question">{row.question}</Ui.ExpandableList.Field>
                                <Ui.ExpandableList.Field all={3}
                                                         name="Author">{row.author.firstName} {row.author.lastName}</Ui.ExpandableList.Field>
                                <Ui.ExpandableList.Field all={4} name="Created">
                                    <Ui.Filters.DateTime value={row.createdOn}/>
                                </Ui.ExpandableList.Field>

                                <Ui.ExpandableList.RowDetailsList title={row.question}>
                                    <Ui.Draft.SimpleEditor name="answer" preview={true} value={row.answer} toolbar={false}/>
                                </Ui.ExpandableList.RowDetailsList>

                                <Ui.ExpandableList.ActionSet>
                                    <Ui.ExpandableList.Action
                                        label="Edit"
                                        icon="icon-pencil"
                                        onClick={() => Webiny.Router.goToRoute('Faq.Article.Edit', {id: row.id, category: this.props.data.id})}/>

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
        );
    }
};

export default ArticleList;