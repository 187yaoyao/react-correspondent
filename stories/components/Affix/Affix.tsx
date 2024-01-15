import React, { useRef } from 'react';
import styled from 'styled-components';
import Affix, { IProps as AffixProps } from '../../../src/components/Affix';


const AffixTest = (props: AffixProps) => {
    const { children, container, offsetBottom, offsetTop = 0 } = props;
    const containerRef = useRef<HTMLDivElement>(null);
    return (
        <Container ref={containerRef}>
             <div style={{ height: 300 ,background: 'blue'}}></div>
            <Affix offsetTop={offsetTop} offsetBottom={offsetBottom} container={() => containerRef}>
                {children ? children : <button>test</button>}
            </Affix>
            <div style={{ height: 300 ,background: 'red'}}></div>
        </Container>
    );
};

const Container = styled.div`
    width: 200px;
    height: 200px;
    overflow-y: auto;
`

export default AffixTest;