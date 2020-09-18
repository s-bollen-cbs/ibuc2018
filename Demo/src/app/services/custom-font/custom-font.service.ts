import { Injectable } from '@angular/core';
import { FontService, DocumentRef, ToastrService, RenderStateService, IFontInfo } from '@blaise/core';

@Injectable({
    providedIn: 'root'
})
export class CustomFontService extends FontService {

    /**
     * Custom font service class constructor
     */
    public constructor(
        document: DocumentRef,
        toastrService: ToastrService,
        renderStateService: RenderStateService
    ) {
      super(document, toastrService, renderStateService);
    }

    /**
     * Get font info 
     */
    public getFontInfo(fontClassName: string): IFontInfo {
        // google maps external font info causes cross domain errors in up-to-date browsers
        try {
            return super.getFontInfo(fontClassName);
        } catch (ex) {
            // notify on error
        }
    }
}
