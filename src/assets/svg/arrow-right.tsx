import {SVGProps, Ref, forwardRef, memo} from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M25.4596 13.4596C25.7135 13.2058 25.7135 12.7942 25.4596 12.5404L21.323 8.4038C21.0692 8.14996 20.6576 8.14996 20.4038 8.4038C20.15 8.65764 20.15 9.0692 20.4038 9.32304L24.0808 13L20.4038 16.677C20.15 16.9308 20.15 17.3424 20.4038 17.5962C20.6576 17.85 21.0692 17.85 21.323 17.5962L25.4596 13.4596ZM11.8387 13.65L25 13.65L25 12.35L11.8387 12.35L11.8387 13.65ZM1 13.65L11.8387 13.65L11.8387 12.35L1 12.35L1 13.65Z"
            fill={props.fill ? props.fill : 'black'}></path>
    </svg>
)
const ForwardRef = forwardRef(SvgComponent)
const Memo = memo(ForwardRef)

export default Memo
