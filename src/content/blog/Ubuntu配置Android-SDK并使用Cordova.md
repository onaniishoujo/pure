---
title: 'Ubuntu配置Android SDK并使用Cordova'
publishDate: '2024-04-06 17:48:53'
description: ''
tags:
  - Android
  - Linux
  - Github
category: Code
draft: false
---

在Ubuntu 20.04.6 LTS上配置Android SDK，并使用Cordova打包Android App

这里使用Github的Codespace

~~用Goorm IDE发现存储空间不够，在Codespace上又重装了一遍~~

## 配置Cordova

```bash
sudo apt update
npm install cordova -g
npm update cordova -g
cordova create <文件夹名> <包名> <软件名>
cd <文件夹名>
cordova platform add android --save
```

预览命令：

```bash
cordova serve
```


## 配置JDK

Codespace自带JDK 21，但是好像有bug，JDK 17能正常使用

```bash
sudo apt install openjdk-17-jdk
```

安装JDK 17后需要设置JDK的环境变量，不然就是用的JDK 21的环境变量

```bash
export JAVA_HOME=/usr/local/sdkman/candidates/java/17.0.10-ms  #jdk17的位置
```

## 配置Android SDK

```bash
wget https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip
unzip commandlinetools-linux-11076708_latest.zip
```

添加环境变量：

```bash
vim ~/.bashrc
```

在`.bashrc`中添加下面三行：

```bash
export ANDROID_SDK_ROOT=/path/to/your/sdk  #你的sdk位置
export ANDROID_HOME=$ANDROID_SDK_ROOT
export PATH=$PATH:$ANDROID_SDK_ROOT/bin
```

重新打开终端，输入

```bash
sdkmanager "platform-tools" "platforms;android-33" "build-tools;33.0.2" --sdk_root=$ANDROID_SDK_ROOT
```

## 打包

```bash
cordova build android
```

## 错误及解决方式

`Error: LinkageError occurred while loading main class com.android.sdklib.tool.sdkmanager.SdkManagerCli        java.lang.UnsupportedClassVersionError: com/android/sdklib/tool/sdkmanager/SdkManagerCli has been compiled by a more recent version of the Java Runtime (class file version 61.0), this version of the Java Runtime only recognizes class file versions up to 55.0`

解决方法：

```bash
sdkmanager "build-tools;33.0.2" --sdk_root=$ANDROID_SDK_ROOT
```



`Could not open settings generic class cache for settings file '/workspaces/android/app/platforms/android/settings.gradle' (/home/codespace/.gradle/caches/7.6/scripts/dqjrgsw17c62wbpoagod92e1e). > BUG! exception in phase 'semantic analysis' in source unit '_BuildScript_' Unsupported class file major version 65`

解决方法：

将`$JAVA_HOME`设置为JDK 17的目录



`Execution failed for task ':app:mergeLibDexDebug'. > Could not resolve all files for configuration ':app:debugRuntimeClasspath'.   > Failed to transform debug (project :CordovaLib) to match attributes {artifactType=android-dex, asm-transformed-variant=NONE, com.android.build.api.attributes.AgpVersionAttr=7.4.2, com.android.build.api.attributes.BuildTypeAttr=debug, com.android.build.gradle.internal.attributes.VariantAttr=debug, dexing-enable-desugaring=true, dexing-enable-jacoco-instrumentation=false, dexing-is-debuggable=true, dexing-min-sdk=24, org.gradle.libraryelements=classes, org.gradle.usage=java-runtime}.      > Execution failed for DexingNoClasspathTransform: /workspaces/android/app/platforms/android/CordovaLib/build/intermediates/runtime_library_classes_dir/debug.         > Error while dexing.`

解决办法：

~~解决上面两个就没这个了~~
