import React, {useState, useEffect} from "react";
import { BOTTOM_SHEET_HEIGHT} from './BottomSheetOption';
import styled from 'styled-components';
import { motion } from "framer-motion";
import UseBottomSheet from './UseBottomSheet';
import Header from './ManualHeader';
import Content from './ManualContent';

const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  
  position: fixed;
  z-index: 1;
  top: calc(100% - 90px); /*시트가 얼마나 높이 위치할지*/
  left: 0;
  right: 0;

  border: 1px solid #D9D9D9;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.6);
  height: ${BOTTOM_SHEET_HEIGHT}px;

  background: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  transition: transform 650ms ease-out; /*바텀시트 애니메이션 속도*/
`

const BottomSheetContent = styled.div`
  overflow: auto;                            
  -webkit-overflow-scrolling: touch;
`

const BottomSheet = ({ handleCourseClick, search, setSelect, department, setDepartment, totalCredits, setTotalCredits, selectedCourses, courseList, setCourseList}) => {

  const { sheet, content } = UseBottomSheet();

  return (
    <Wrapper ref={sheet}>
      <Header />
      <BottomSheetContent ref={content}>
        <Content  
            handleCourseClick={handleCourseClick} 
            search={search}
            setSelect={setSelect}
            department={department}
            setDepartment={setDepartment}
            totalCredits={totalCredits}
            setTotalCredits={setTotalCredits}
            selectedCourses={selectedCourses} 
            courseList={courseList} 
            setCourseList={setCourseList}
          />
      </BottomSheetContent>
    </Wrapper>
  );
};

export default BottomSheet;