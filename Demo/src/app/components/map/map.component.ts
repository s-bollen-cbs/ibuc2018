import { Component, ChangeDetectorRef, ElementRef, forwardRef, Inject, OnInit, AfterViewInit } from '@angular/core';
import { ServiceProviderService, StringFieldConverterService, /*StringTextboxComponent,*/ ReferenceComponent,  IStringTextBoxControl } from '@blaise/core';
import { MouseEvent } from '@agm/core';
import { Observable } from 'rxjs';
// services
import { MapService } from '../../services/map/map.service';
// type definitions
import { IMarker } from '../../../types/classes/IMarker';
// enums
import { CustomProperty } from '../../../types/enums/custom-property.enum';

/**
 * The map component class is used to allow a user to select a location by map.
 * This location can be predefined (markers) or the result of a user interaction (map click).
 */
@Component({
    selector: 'div[data-gm-maps-component]',
    styleUrls: ['./map.component.scss'],
    templateUrl: './map.component.html'
})
export class MapComponent extends ReferenceComponent<IStringTextBoxControl> implements OnInit {

	/**
     * Returns the initial latitude as defined in the control centre or the resource database
	 */
    private get initialLatitude(): number {
        return (this.dataObject && this.sp.customPropertyService.hasCustomProperty(this.dataObject, CustomProperty.Latitude))
            ? parseFloat(this.sp.customPropertyService.getValueForCustomProperty(this.dataObject, CustomProperty.Latitude))
            : 52.066041;
    }

	/**
     * Returns the initial longitude as defined in the control centre or the resource database
	 */
    private get initialLongitude(): number {
        return (this.dataObject && this.sp.customPropertyService.hasCustomProperty(this.dataObject, CustomProperty.Longitude))
            ? parseFloat(this.sp.customPropertyService.getValueForCustomProperty(this.dataObject, CustomProperty.Longitude))
            : 4.400356;
    }

	/**
     * Returns the initial zoom level as defined in the control centre or the resource database
	 */
    private get initialZoomLevel(): number {
        return (this.dataObject && this.sp.customPropertyService.hasCustomProperty(this.dataObject, CustomProperty.Zoom))
            ? parseInt(this.sp.customPropertyService.getValueForCustomProperty(this.dataObject, CustomProperty.Zoom), 10)
            : 12;
    }

	/**
     * Flag indicating if the user should select a location on the map or select a marker
	 */
    private get showUserLocationPropertyValue(): boolean {
        return (this.dataObject && this.sp.customPropertyService.hasCustomProperty(this.dataObject, CustomProperty.ShowUserLocation))
            ? this.sp.customPropertyService.getValueForCustomProperty(this.dataObject, CustomProperty.ShowUserLocation)
            : false;
    }

	/**
     * current latitude
	 */
    public latitude: number;
	/**
     * current longitude
	 */
    public longitude: number;
	/**
     * current latitude
	 */
    public zoomLevel: number;

    /**
     * Text displayed
     */
    public infoText: string;

    /**
     * Visiblity flag for user location marker, also influences map interactions
     */
    public showUserLocation = false;
    /**
     * User location marker
     */
    public userMarker: IMarker;
    /**
     * Marker observable from service
     */
    public markers$: Observable<IMarker[]>;

	/*
	 * The map component class constructor
	 */
    public constructor(
        @Inject(forwardRef(() => ServiceProviderService)) protected sp: ServiceProviderService,
        protected el: ElementRef,
        protected cd: ChangeDetectorRef,
        protected converter: StringFieldConverterService,
        protected mapService: MapService
    ) {
        super(sp, el, cd);
    }

	/*
	 * The map component class initiation function
	 * Set the initial value as current
	 * Load markers (set observable)
	 * Retrieve the current user location
	 */
    public ngOnInit(): void {
        super.ngOnInit();
        this.infoText = '';
        // set a default location (fallback from properties or CBS Netherlands in The Hague)
        this.latitude = this.initialLatitude;
        this.longitude = this.initialLongitude;
        this.zoomLevel = this.initialZoomLevel;
        this.showUserLocation = this.showUserLocationPropertyValue;
        if (!this.showUserLocation) {
            // set markers
            this.markers$ = this.mapService.markers;
        }
        // set current location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                // Update map position
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                // set text value
                this.infoText = `user location detected (lat:${position.coords.latitude};lng:${position.coords.longitude})`;
                // Set user location marker
                this.userMarker = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    clickable: false,
                    draggable: true
                };
                if (this.showUserLocation) {
                    this.converter.setNormalAnswer(`${position.coords.latitude},${position.coords.longitude}`, this.referenceSubject.getValue());
                }
            });
        }
    }

	/*
	 * Map click handler
	 */
    public clickedMap($event: MouseEvent) {
        // update map position
        this.latitude = $event.coords.lat;
        this.longitude = $event.coords.lng;
        // Update user location marker
        this.userMarker.latitude = $event.coords.lat;
        this.userMarker.longitude = $event.coords.lng;
        // Update text value
        if (this.showUserLocation) {
            this.infoText = `user location updated (lat:${$event.coords.lat};lng:${$event.coords.lng})`;
            this.converter.setNormalAnswer(`${$event.coords.lat},${$event.coords.lng}`, this.referenceSubject.getValue());
        }
    }

	/*
	 * Marker drag end (drop) handler
	 */
    public droppedMarker($event: MouseEvent) {
        if (this.showUserLocation) {
            this.clickedMap($event);
        }
    }

	/*
	 * Marker click handler
	 */
    public clickedMarker(marker: IMarker, index: number): void {
        if (!this.showUserLocation) {
            this.infoText = `${marker.label.toLowerCase()}. ${marker.title} (lat:${marker.latitude};lng:${marker.longitude})`;
            this.converter.setNormalAnswer(`${marker.title}`, this.referenceSubject.getValue());
        }
    }
}
