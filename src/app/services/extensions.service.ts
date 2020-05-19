import { Injectable } from '@angular/core';
import { ExtensionLoaderService } from './extension-loader.service';
import { ExtensionConfig } from '../model/config/extension.config';

@Injectable({
    providedIn: 'root'
})
export class ExtensionsService {

    //配置文件位置
    configPath = 'assets/app.extensions.json';

    features: Array<any> = [];


    constructor(protected extensionLoaderService: ExtensionLoaderService) { }

    async load(): Promise<ExtensionConfig> {
        const config = await this.extensionLoaderService.load(
            this.configPath
        );
        this.setup(config);
        return config;
    }

    setup(config: ExtensionConfig) {
        this.features = this.extensionLoaderService.getFeatures(config);
    }

    appSidebarRoute(){
        return this.getFeature('sidebar');
    }
    
    /**
     * 获取app.extensions.json中features的对象
     * @param key 需要获取的key
     */
    getFeature(key: string): any[] {
        return this.features[key];
    }
}
