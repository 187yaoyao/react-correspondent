import React, { useRef } from "react";
import styled from "styled-components";
import Affix from "../src/components/Affix";

const AffixTest = () => {
 const containerRef = useRef<HTMLDivElement>(null);
  return (
    <Container id="affix-container" ref={containerRef}>
        <div style={{height: 1000,background: 'black'}}></div>
        <Affix container={() => containerRef} offsetTop={50}>
            <button>test</button>
        </Affix>
        <Insert/>
    </Container>
  );
};

export default AffixTest;


const Container = styled.div`
    height: 50%;
    overflow-y: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
`

const Insert = styled.div`

    height: 1000px;
    background-color: red;
`