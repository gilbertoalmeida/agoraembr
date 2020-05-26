import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Descriptions } from "antd";
import { getJournal } from "../../actions/journalActions";

const OriginalCard = ({
  getJournal,
  topic,
  article,
  journal: { journal, journalLoading }
}) => {
  useEffect(() => {
    if (article) {
      getJournal(article.journalID);
    }
  }, [article, getJournal]);

  return journalLoading && !journal ? (
    <div>CARREGANDO</div>
  ) : !journal ? (
    <div>NAO ENCONTRADO</div>
  ) : (
    <div className="original-card">
      <Descriptions
        title="Ficha do artigo original"
        layout="vertical"
        column={1}
      >
        <Descriptions.Item label="Título">{article.title}</Descriptions.Item>
        <Descriptions.Item label="Revista científica">
          {journal.title}
        </Descriptions.Item>
        <Descriptions.Item label="DOI">
          <a href={article.doi} target="_blank" rel="noopener noreferrer">
            {article.doi}
          </a>
        </Descriptions.Item>
        <Descriptions.Item label="Tópico">{topic.title}</Descriptions.Item>
      </Descriptions>
    </div>
  );
};

OriginalCard.propTypes = {
  getJournal: PropTypes.func.isRequired,
  journal: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  journal: state.journal
});

export default connect(
  mapStateToProps,
  { getJournal }
)(OriginalCard);
