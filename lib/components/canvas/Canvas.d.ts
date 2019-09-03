import * as React from "react";
import "@kartikrao/lib-forms-core/lib/forms.core.m.css";
export interface CanvasProps {
    onSave?: (formData: any) => void;
}
export declare const Canvas: React.FC<CanvasProps>;
