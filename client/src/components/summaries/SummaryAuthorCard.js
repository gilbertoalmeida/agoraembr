import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { prettyDateNoHours } from "../../Utils/Utils.js";

import { getSummaryAuthor } from "../../actions/userActions";

const SummaryAuthorCard = ({
  summary,
  getSummaryAuthor,
  user: { summaryAuthor, userLoading }
}) => {
  useEffect(() => {
    getSummaryAuthor(summary.authorID);
  }, [getSummaryAuthor, summary]);

  return userLoading && !summaryAuthor ? (
    <div>CARREGANDO</div>
  ) : !summaryAuthor ? (
    <div>NAO ENCONTRADO</div>
  ) : (
    <div className="summary-author-card">
      Resumo escrito por {summaryAuthor.completeName} em{" "}
      {prettyDateNoHours(summary.posted)}
    </div>
  );
};

SummaryAuthorCard.propTypes = {
  getSummaryAuthor: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { getSummaryAuthor }
)(SummaryAuthorCard);
