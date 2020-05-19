export interface ExtensionRef {
    $id: string;
    $name: string;
    $version: string;
    $description?: string;

    features?: {
        [key: string]: any;
    };
}

export interface ExtensionConfig extends ExtensionRef {
    $references?: Array<string | ExtensionRef>;
}