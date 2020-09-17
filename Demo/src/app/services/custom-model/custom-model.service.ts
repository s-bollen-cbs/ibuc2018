import { HelpTextComponent } from './../../components/help-text/help-text.component';
import { Injectable } from '@angular/core';
import { ModelService, CustomPropertyService, IBaseControl, IBaseComponentViewModel, TextComponent, StringTextboxComponent } from '@blaise/core';
// components
import { MapComponent } from '../../components/map/map.component';
// type definitions
import { CustomProperty } from '../../../types/enums/custom-property.enum';

/**
 * Custom model service class
 */
@Injectable({
    providedIn: 'root'
})
export class CustomModelService extends ModelService {
    /**
     * Custom model service class constructor
     * @param {CustomPropertyService} customPropertyService
     */
    public constructor(private customPropertyService: CustomPropertyService) {
        super();
    }

    /**
     * Provides an extension to the Blaise default model service's create child function.
     * @param {IBaseControl} control
     * @param {string} parent
     * @returns {IBaseComponentViewModel}
     */
    public createChild(control: IBaseControl, parent: string): IBaseComponentViewModel {
        const child: IBaseComponentViewModel = super.createChild(control, parent);
        if (control && this.customPropertyService.hasCustomProperties(control)) {
            if (child.type === TextComponent && this.isHelpTextComponent(control)) {
                child.type = HelpTextComponent;
            } else if (child.type === StringTextboxComponent && this.isMapComponent(control)) {
                child.type = MapComponent;
            }
        }
        return child;
    }

    private isHelpTextComponent(control: IBaseControl): boolean {
        return this.customPropertyService.hasCustomProperty(control, CustomProperty.IsHelpText)
            && this.customPropertyService.getValueForCustomProperty(control, CustomProperty.IsHelpText);
    }

    private isMapComponent(control: IBaseControl): boolean {
        return this.customPropertyService.hasCustomProperty(control, CustomProperty.SelectFromMap)
            && this.customPropertyService.getValueForCustomProperty(control, CustomProperty.SelectFromMap);
    }
}
