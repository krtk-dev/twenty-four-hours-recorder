package com.koreanthinker.twentyfourhourrecorder.BackgroundAudioRecord;

import android.app.ActivityManager;
import android.content.Intent;
import android.content.Context;

import androidx.core.content.ContextCompat;

public class BackgroundAudioRecord {
    public void startService(Context context) {
        if(isLaunchingService(context)) return;
        Intent serviceIntent = new Intent(context, ForeGroundService.class);
        serviceIntent.putExtra("inputExtra", "Foreground Service Example in Android");
        ContextCompat.startForegroundService(context, serviceIntent);
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
