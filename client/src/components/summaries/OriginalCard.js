import React from "react";
import { Descriptions } from "antd";

const OriginalCard = ({ topic, article }) => {
  return (
    <div className="original-card">
      <Descriptions title="Ficha do artigo" layout="vertical" column={1}>
        <Descriptions.Item label="Título original">
          {article.title}
        </Descriptions.Item>
        <Descriptions.Item label="Revista científica">
          The Lancet
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

export default OriginalCard;
