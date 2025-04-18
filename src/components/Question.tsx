import React from 'react';

interface Props {
  text: string;
}

const Question: React.FC<Props> = ({ text }) => {
  return <p>{text}</p>;
};

export default Question;
