package com.koreanthinker.twentyfourhourrecorder.BackgroundAudioRecord;

import com.koreanthinker.twentyfourhourrecorder.R; //나중에 페키지명 바꿀때 같이 수정좀
import com.koreanthinker.twentyfourhourrecorder.MainActivity;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Intent;
import android.os.Build;
import android.os.IBinder;
import android.util.Log;

import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;

public class ForeGroundService extends Service {
    private static final String TAG = "MainActivity";

    public static final String CHANNEL_ID = "RecordingForegroundServiceChannel";
    public static RecordManager RM = null;

    @Override
    public void onCreate() {
        super.onCreate();
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        // String input = intent.getStringExtra("inputExtra"); //props 개념
        Log.d("ASDF", "onCommand");
        createNotificationChannel();
        Intent notificationIntent = new Intent(this, MainActivity.class);
        PendingIntent pendingIntent = PendingIntent.getActivity(this, 0, notificationIntent, 0); // activity 유지
        Notification notification = new NotificationCompat.Builder(this, CHANNEL_ID).setContentText("Save last 10 min")
                .addAction(R.mipmap.ic_launcher, "save", pendingIntent)
                .addAction(R.mipmap.ic_launcher, "other", pendingIntent).setSmallIcon(R.mipmap.ic_launcher)
                .setContentIntent(pendingIntent).build();

        startForeground(1, notification);
        // 쓰레드 동작 시작
        RM = new RecordManager(this);
        RM.onRecord();

        return START_NOT_STICKY;
    }

    @Override
    public void onDestroy() {
        Log.d(TAG, "destory recording");
        RM.onStop();
        super.onDestroy();
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel serviceChannel = new NotificationChannel(CHANNEL_ID,
                    "Recording Foreground Service Channel", NotificationManager.IMPORTANCE_DEFAULT);
            NotificationManager manager = getSystemService(NotificationManager.class);
            manager.createNotificationChannel(serviceChannel);
        }

    }
}
