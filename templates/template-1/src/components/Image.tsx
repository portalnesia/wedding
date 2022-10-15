import React from 'react'
import { styled, SxProps, Theme } from '@mui/material'
//@ts-ignore
import {LazyLoadImage} from 'react-lazy-load-image-component'
import '@fancyapps/fancybox/dist/jquery.fancybox.min.css';

const Img = styled(LazyLoadImage)(()=>({

}))

const A = styled("a")(()=>({
    cursor:"pointer"
}))

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    sx?: SxProps<Theme>
    fancybox?: string
    aSx?: SxProps<Theme>
}

const Images = React.forwardRef<HTMLImageElement,ImageProps>(({aSx,sx,fancybox,src,title,alt,...props},ref)=>{

    const onRightClick: React.MouseEventHandler<HTMLImageElement> = React.useCallback((event: React.MouseEvent<HTMLImageElement>)=>{
        event.stopPropagation()
        event.preventDefault()
    },[])

    React.useEffect(()=>{
        if(fancybox) {
            const wind = window;
            const $=require('jquery');
            (wind as any).jQuery=$;
            require('@fancyapps/fancybox');
            $('[data-fancybox]').fancybox({
                protect: true,
                hash: false,
                mobile:{
                    clickSlide: function() {
                        return "close";
                    }
                },
            });
        }
    },[fancybox])

    return (
        <>
            {fancybox ? (
                <A sx={aSx} title={title} data-fancybox={fancybox} data-src={src} data-options="{'protect':'true'}" {...(title||alt ? {'data-caption':title||alt} : {})}>
                    <Img title={title} alt={alt} ref={ref} sx={sx} src={src} {...props} onContextMenu={onRightClick} />
                </A>
            ) : (
                <Img title={title} alt={alt} ref={ref} sx={sx} src={src} {...props} onContextMenu={onRightClick} />
            )}
        </>
    )
})

export default Images