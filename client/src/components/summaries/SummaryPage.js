import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ReactHtmlParser from "react-html-parser";

import LoadingArticlePage from "../articles/LoadingArticlePage";
import ArticleNotFound from "../articles/ArticleNotFound";
import OriginalCard from "./OriginalCard";

import { getTopic } from "../../actions/topicActions";
import { getArticle } from "../../actions/articleActions";
import { getSummary } from "../../actions/summaryActions";
import { prettyDateNoHours } from "../../Utils/Utils.js";
import SummaryAuthorCard from "./SummaryAuthorCard";

let resizeEventListener = null;

const SummaryPage = ({
  getSummary,
  getTopic,
  getArticle,
  summary: { summary, summaryLoading },
  topic: { topic, topicLoading },
  article: { article, articleLoading },
  match
}) => {
  useEffect(() => {
    /* window.scrollTo(0, 0); */
    getSummary(match.params.id);
  }, [getSummary, match.params.id]);

  useEffect(() => {
    if (summary) {
      getTopic(summary.topicID);
      getArticle(summary.articleID);
    }
  }, [summary, getTopic, getArticle]);

  /* getting the height of the content part of the heading and setting it to the height
  of the whole heading (so that the picture in the background also scales properly)
  There's also a resize listener to redo this if the user resizes */
  const headingContentRef = useRef(null);

  useEffect(() => {
    if (summary && topic && article) {
      let headingContentHeight = headingContentRef.current.offsetHeight;
      let heading = document.getElementById("heading");
      heading.style.height = headingContentHeight + "px";
    }
  }, [summary, topic, article]);

  if (resizeEventListener === null) {
    /* If I don't check for this, it adds a new event listener on every render, and it becomes an 
    exponential problem.*/
    resizeEventListener = window.addEventListener("resize", () => {
      let headingContentHeight = headingContentRef.current.offsetHeight;
      let heading = document.getElementById("heading");
      heading.style.height = headingContentHeight + "px";
    });
  }

  return summaryLoading ||
    articleLoading ||
    topicLoading ||
    !topic ||
    !article ? (
    <LoadingArticlePage />
  ) : !summary ? (
    <ArticleNotFound />
  ) : (
    <div className="summary-page__main-element">
      <div id="heading" className="page-heading summary-page__heading">
        <img src={topic.coverPic.url} alt="imagem de capa do assunto"></img>
        <div className="summary-page__heading__pre-content">
          <div
            ref={headingContentRef}
            className="summary-page__heading__content"
          >
            <h1 className="summary-page__heading__content__title">
              {summary.title}
            </h1>
            <div className="summary-page__heading__content__authors">
              Autores: {article.authors}
            </div>
            <div className="summary-page__heading__content__date">
              Publicado em: {prettyDateNoHours(article.publishedDate)}
            </div>
          </div>
        </div>
      </div>
      <div className="summary-page__content">
        <div className="summary-page__content__body">
          <div className="summary-page__content__body__text">
            {ReactHtmlParser(summary.text)}
          </div>
          <div className="summary-page__content__body__summary-author-info">
            <SummaryAuthorCard summary={summary} />
          </div>
        </div>
        <div className="summary-page__content__sider">
          <OriginalCard article={article} topic={topic} />
        </div>
      </div>
    </div>
  );
};

SummaryPage.propTypes = {
  getSummary: PropTypes.func.isRequired,
  getTopic: PropTypes.func.isRequired,
  getArticle: PropTypes.func.isRequired,
  summary: PropTypes.object.isRequired,
  topic: PropTypes.object.isRequired,
  article: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  summary: state.summary,
  topic: state.topic,
  article: state.article
});

export default connect(
  mapStateToProps,
  { getSummary, getTopic, getArticle }
)(SummaryPage);
