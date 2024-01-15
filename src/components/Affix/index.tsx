import { useEffect, useCallback, useRef } from 'react';

export interface IProps {
    children: React.ReactNode | null;
    container?: () => any; // affix的容器，默认为body
    offsetTop?: number; // 距离顶部的距离
    offsetBottom?: number; // 距离底部的距离
}

const Affix: React.FC<IProps> = (props) => {
    const { children, container, offsetBottom, offsetTop = 0 } = props;

    const affixRef = useRef<HTMLDivElement>(null);
    const affixWrapRef = useRef<HTMLDivElement>(null);
    const placeholderEL = useRef<HTMLDivElement | null>(null); // 占位元素

    const handleScroll = useCallback(() => {
       
        const containerDOM = container?.().current as HTMLElement;
        const containerToTop = containerDOM.getBoundingClientRect().top;// 容器距离页面顶部的距离
        const containerToBottom = window.innerHeight - containerDOM.getBoundingClientRect().bottom;// 容器距离页面底部的距离
        const affixed = affixWrapRef.current?.contains(placeholderEL.current!) // 元素是否固定
        if (!affixed) {
            const {
                top = 0,
                height,
                bottom = 0
            } = affixRef.current?.getBoundingClientRect() || {};
            const affixToTop = top - containerToTop;
            if (offsetBottom !== undefined) {
                // 如果设置了offsetBottom，那么当元素到达底部的时候，固定元素
                const totalHeight = bottom + offsetBottom + containerToBottom
                if (totalHeight <= window.innerHeight) {
                    affixRef.current!.style.position = 'fixed';
                    affixRef.current!.style.bottom = offsetBottom + containerToBottom + 'px';
                    placeholderEL.current!.style.height = height + 'px';
                    affixWrapRef.current!.appendChild(placeholderEL.current!);
                }

            } else if (affixToTop <= offsetTop) {
                // 如果设置了offsetTop，那么当元素到达顶部的时候，固定元素
                affixRef.current!.style.position = 'fixed';
                affixRef.current!.style.top = offsetTop + containerToTop + 'px';
                placeholderEL.current!.style.height = height + 'px';
                affixWrapRef.current!.appendChild(placeholderEL.current!);
            }
        } else {
            const {
                top,
                bottom
            } = placeholderEL.current!.getBoundingClientRect();
            const placeholderToTop = top - containerToTop;
            if (offsetBottom !== undefined) {
                // 如果设置了offsetBottom，元素离开底部的时候，取消固定
                const totalHeight = bottom + offsetBottom + containerToBottom
                if (totalHeight >= window.innerHeight) {
                    affixRef.current!.style.position = 'static';
                    placeholderEL.current!.remove();
                }
                return
            } else if (placeholderToTop > offsetTop) {
                // 如果设置了offsetTop，元素离开顶部的时候，取消固定
                affixRef.current!.style.position = 'static';
                placeholderEL.current!.remove();
            }
        }
    }, [affixRef, container]);

    useEffect(() => {
        const containerDOM = container?.();
        if (!containerDOM) return;

        containerDOM.current.addEventListener('scroll', handleScroll);
        return () => {
            containerDOM.current && containerDOM.current.removeEventListener('scroll', handleScroll);
        };
    }, [container, handleScroll]);

    useEffect(() => {
        placeholderEL.current = document.createElement('div');
    }, [])

    useEffect(() => {
        handleScroll();
    }, [handleScroll])


    return (
        <div ref={affixWrapRef}>
            <div ref={affixRef} id="affix">
                {children}
            </div>
        </div>
    );
};

export default Affix;
