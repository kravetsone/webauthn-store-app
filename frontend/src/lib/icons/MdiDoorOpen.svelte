<script>
    export let size = "24px";
    export let width = size;
    export let height = size;
    export let color = "currentColor";
    export let viewBox = "0 0 24 24";

    let className = void 0;
    export { className as class }
</script>

<svg width={width} height={height} viewBox={viewBox} class={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3C10.89 3 10 3.89 10 5H3V19H2V21H22V19H21V5C21 3.89 20.11 3 19 3H12ZM12 5H19V19H12V5ZM5 11H7V13H5V11Z" fill={color} />
</svg>
