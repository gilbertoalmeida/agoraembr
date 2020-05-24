import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getSummary } from "../../actions/summaryActions";
import PropTypes from "prop-types";
import ReactHtmlParser from "react-html-parser";

import LoadingArticlePage from "../articles/LoadingArticlePage";
import ArticleNotFound from "../articles/ArticleNotFound";

const SummaryPage = ({ getSummary, summary: { summary, loading }, match }) => {
  useEffect(() => {
    getSummary(match.params.id);
    window.scrollTo(0, 0);
  }, [getSummary, match.params.id]);

  return loading && !summary ? (
    <LoadingArticlePage />
  ) : !summary ? (
    <ArticleNotFound />
  ) : (
    <div>
      <header>
        <h1>Summary</h1>
      </header>
      <div>{summary.title}</div>
      <div>{ReactHtmlParser(summary.text)}</div>
    </div>
  );
};

SummaryPage.propTypes = {
  getSummary: PropTypes.func.isRequired,
  summary: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  summary: state.summary
});

export default connect(
  mapStateToProps,
  { getSummary }
)(SummaryPage);
