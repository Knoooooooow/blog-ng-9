import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExtensionConfig } from '../model/config/extension.config';

@Injectable({
    providedIn: 'root'
})
export class ExtensionLoaderService {

    constructor(private http: HttpClient) { }

    load(configPath: string): Promise<ExtensionConfig> {
        return new Promise<any>((resolve) => {
            this.loadConfig(configPath).then((result) => {
                resolve(result.config);
            })
        })
    }
    protected loadConfig(
        url: string
    ): Promise<{ config: ExtensionConfig }> {
        return new Promise((resolve) => {
            this.http.get<ExtensionConfig>(url).subscribe(
                (config) => {
                    resolve({
                        config
                    });
                },
                () => {
                    resolve(null);
                }
            );
        });
    }
    getFeatures(config: ExtensionConfig): any {
        if (config) {
            return config.features || [];
        }
        return [];
    }
}
