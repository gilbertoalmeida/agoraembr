import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getSummary } from "../../actions/summaryActions";
import PropTypes from "prop-types";
import ReactHtmlParser from "react-html-parser";

import LoadingArticlePage from "../articles/LoadingArticlePage";
import ArticleNotFound from "../articles/ArticleNotFound";
import { getTopic } from "../../actions/topicActions";

const SummaryPage = ({
  getSummary,
  getTopic,
  summary: { summary, loading },
  topic: { topic },
  match
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    getSummary(match.params.id);
  }, [getSummary, match.params.id]);

  useEffect(() => {
    if (summary) {
      getTopic(summary.topicID);
    }
  }, [summary, getTopic]);

  return loading && !summary ? (
    <LoadingArticlePage />
  ) : !summary || !topic ? (
    <ArticleNotFound />
  ) : (
    <div>
      <header>
        <h1>Summary</h1>
      </header>
      <img src={topic.coverPic.url} alt="imagem de capa do assunto"></img>
      <div>{summary.title}</div>
      <div>{ReactHtmlParser(summary.text)}</div>
    </div>
  );
};

SummaryPage.propTypes = {
  getSummary: PropTypes.func.isRequired,
  getTopic: PropTypes.func.isRequired,
  summary: PropTypes.object.isRequired,
  topic: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  summary: state.summary,
  topic: state.topic
});

export default connect(
  mapStateToProps,
  { getSummary, getTopic }
)(SummaryPage);
