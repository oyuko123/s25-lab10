import React from 'react';

interface Props {
  option: string;
  selected: boolean;
  onSelect: (option: string) => void;
}

const AnswerOption: React.FC<Props> = ({ option, selected, onSelect }) => {
  return (
    <li
      className={selected ? 'selected' : ''}
      onClick={() => onSelect(option)}
    >
      {option}
    </li>
  );
};

export default AnswerOption;
