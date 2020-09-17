/**
 * Information for rendering a map marker inside google maps
 */
export interface IMarker {
	/**
	 * The latitude position of the marker.
	 */
	latitude: number;
	/**
	 * The longitude position of the marker.
	 */
	longitude: number;
	/**
	 * The label (a single uppercase character) for the marker.
	 */
	label?: string;
	/**
	 * The title of the marker.
	 */
	title?: string;
	/**
	 * If true, the marker can be clicked. Default value is true.
	 */
	clickable?: boolean;
	/**
	 * If true, the marker can be dragged. Default value is false.
	 */
	draggable?: boolean;
	/**
	 * Whether to automatically open the child info window when the marker is clicked.
	 */
	openInfoWindow?: boolean;
}