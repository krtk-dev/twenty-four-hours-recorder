package com.koreanthinker.twentyfourhourrecorder.BackgroundAudioRecord;

import android.app.ActivityManager;
import android.content.BroadcastReceiver;
import android.content.ComponentName;
import android.content.ContentResolver;
import android.content.Intent;
import android.content.Context;
import android.content.IntentFilter;
import android.content.IntentSender;
import android.content.ServiceConnection;
import android.content.SharedPreferences;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.content.res.AssetManager;
import android.content.res.Configuration;
import android.content.res.Resources;
import android.database.DatabaseErrorHandler;
import android.database.sqlite.SQLiteDatabase;
import android.graphics.Bitmap;
import android.graphics.drawable.Drawable;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.os.UserHandle;
import android.util.Log;
import android.view.Display;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.core.content.ContextCompat;

public class BackgroundAudioRecord {

    public void startService(Context context) {
        if(isLaunchingService(context)) return;
        Intent serviceIntent = new Intent(context, ForeGroundService.class);
        if (Build.VERSION.SDK_INT >= 26) {
            Log.d("ASDF", "START SERVICE");
            context.startForegroundService(serviceIntent);
            Log.d("ASDF", "START SUCCESS");
        } else {
            context.startService(serviceIntent);
        }
    }

    public void stopService(Context context) {
        if(!isLaunchingService(context)) return;
        Intent serviceIntent = new Intent(context, ForeGroundService.class);
        context.stopService(serviceIntent);
    }

    public String saveRecording(int time, String name, Context context) throws NoSuchMethodException {
        if(!isLaunchingService(context)){
            throw new NoSuchMethodException("Service not Running");
        }
        return ForeGroundService.RM.onSave(time, name);
    }

    public Boolean isLaunchingService(Context mContext) {

        ActivityManager manager = (ActivityManager) mContext.getSystemService(Context.ACTIVITY_SERVICE);

        for (ActivityManager.RunningServiceInfo service : manager.getRunningServices(Integer.MAX_VALUE)) {
            if (ForeGroundService.class.getName().equals(service.service.getClassName())) {
                return true;
            }
        }

        return false;
    }
}
