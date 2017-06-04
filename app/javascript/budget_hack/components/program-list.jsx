import React from 'react';

const ProgramList = ({ programs, addProgram }) => {
  return (
    <div className="content-wrapper program-list-modal">
      <div className="list-wrapper is--programs" >
        <ul className="list">
          { programs.map((program) => {
            return (
              <li className="list__item" key={ program.id }>
                <button
                  aria-label={ program.name }
                  onClick={ addProgram(program.name) }>
                  { program.name }
                </button>
              </li>
            );
          }) }
        </ul>
      </div>
    </div>
  );
};
export default ProgramList;
