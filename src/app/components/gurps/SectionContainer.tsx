export default function SectionContainer(props: any) {
    const {children, ...otherProps} = props;
    return (
        <div className="flex flex-col w-full">
            <div>{props.title}</div>
            <div className="border p-1">{children}</div>
        </div>
    );
}
