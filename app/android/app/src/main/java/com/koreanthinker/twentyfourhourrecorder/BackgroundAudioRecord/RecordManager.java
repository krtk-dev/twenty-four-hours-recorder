package com.koreanthinker.twentyfourhourrecorder.BackgroundAudioRecord;

import android.content.Context;
import android.media.AudioFormat;
import android.media.AudioRecord;
import android.media.AudioTrack;
import android.media.MediaRecorder;
import android.os.Environment;
import android.util.Log;
import android.widget.Toast;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

public class RecordManager {

    private static final String TAG = "MainActivity";
    private static final long MAX_TIME = 1800;
    private File ROOT_FILE;
    private String FILE_PATH_1;
    private String FILE_PATH_2;
    private String SAVE_PATH;

    private Context context;

    private int mAudioSource = MediaRecorder.AudioSource.MIC;
    private int mSampleRate = 16000;
    private int mChannelCount = AudioFormat.CHANNEL_IN_STEREO;
    private int mAudioFormat = AudioFormat.ENCODING_PCM_16BIT;
    private int mBufferSize = AudioTrack.getMinBufferSize(mSampleRate, mChannelCount, mAudioFormat);

    private AudioRecord mAudioRecord = null;
    private Thread mRecordThread = null;
    private boolean isRecording = false;
    private String currentPath = null;

    private FileOutputStream fos = null;

    private SoundPlayer SP;
    private String lastSavePath;
    private int currentFileByte = 0;

    private final int bytePerSec = mSampleRate * 4;

    RecordManager(Context context) {
        this.context = context;
        Log.d(TAG, "init recording");

        // soundplayer 설정
        SP = new SoundPlayer();
        // sd카드 확인
        String sdcard = Environment.getExternalStorageState();
        if (!sdcard.equals(Environment.MEDIA_MOUNTED)) {
            // SD카드가 마운트되어있지 않음
            ROOT_FILE = Environment.getRootDirectory();
            Log.d(TAG, "SD카드 마운트 X");
        } else {
            // SD카드가 마운트되어있음
            ROOT_FILE = Environment.getExternalStorageDirectory();
            Log.d(TAG, "SD카드 마운트 O");
        }
        SAVE_PATH = ROOT_FILE.getAbsolutePath() + "/24hourRecord";
        FILE_PATH_1 = SAVE_PATH + "/24hourRecordTemp1.pcm";
        FILE_PATH_2 = SAVE_PATH + "/24hourRecordTemp2.pcm";
        File dir = new File(SAVE_PATH);
        Log.d(TAG, FILE_PATH_1);
        if (!dir.exists()) {
            Log.d(TAG, dir.mkdirs() ? "파일 생성 성공" : "파일생성 실패");
        }

        removeFile(FILE_PATH_1);
        removeFile(FILE_PATH_2);
    }

    private void threadProcess() {
        Log.d(TAG, "start thread");
        byte[] readData = new byte[mBufferSize];
        if (fos == null) {
            try {
                currentPath = currentPath == null ? FILE_PATH_1 : currentPath;
                fos = new FileOutputStream(FILE_PATH_1);
            } catch (FileNotFoundException e) {
                e.printStackTrace();
            }
        }
        Log.d(TAG, "" + bytePerSec);

        while (isRecording) {
            // 최대 시간 초과시 fos 스위치
            if (bytePerSec * MAX_TIME <= currentFileByte) {
                // 파일 바이트 변수 초기화
                currentFileByte = 0;
                // fos 삭제하기 위해 닫기
                try {
                    fos.close();
                } catch (IOException e) {
                    e.printStackTrace();
                    Log.d(TAG, e.getMessage());
                }
                // 주소 변경
                if (currentPath == FILE_PATH_1) {
                    currentPath = FILE_PATH_2;
                } else {
                    currentPath = FILE_PATH_1;
                }

                // 앞으로 사용할 주소 초기화
                File file = new File(currentPath);
                if (file.exists()) {
                    if (!file.delete()) {
                        ErrorAndStop();
                    }
                }

                // 새로운 주소로 fos 등록
                try {
                    fos = new FileOutputStream(currentPath);
                } catch (FileNotFoundException e) {
                    e.printStackTrace();
                    Log.d(TAG, e.getMessage());
                }

                Log.d(TAG, "CHANGED");
            }
            // 소리 읽고 pcm에 쓰기
            int ret = mAudioRecord.read(readData, 0, mBufferSize);
            Log.d(TAG, "" + ret + " : " + mBufferSize + " : " + currentFileByte);
            try {
                fos.write(readData, 0, mBufferSize);
                currentFileByte += ret;
            } catch (IOException e) {
                e.printStackTrace();
            } catch (NullPointerException e) {
                Log.d(TAG, "THREAD ERROR");
                ErrorAndStop();
            }

        }

        mAudioRecord.stop();
        mAudioRecord.release();
        mAudioRecord = null;

        try {
            fos.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        Log.d(TAG, "stop thread");
    }

    public void onRecord() {
        if (isRecording)
            return;
        isRecording = true;
        mAudioRecord = new AudioRecord(mAudioSource, mSampleRate, mChannelCount, mAudioFormat, mBufferSize);
        mAudioRecord.startRecording();
        mRecordThread = new Thread(new Runnable() {
            @Override
            public void run() {
                threadProcess();
            }
        });
        mRecordThread.start();
        Log.d(TAG, "start recording");
    }

    public void onStop() {
        if (!isRecording)
            return;
        isRecording = false;
        mAudioRecord.stop();
        Log.d(TAG, "stop recording");
    }

    public void reset() {
        fos = null;
    }

    public String onSave(int time, String name) {
        Log.d(TAG, "save recording");
        long date = System.currentTimeMillis();
        File f1 = new File(currentPath == FILE_PATH_1 ? FILE_PATH_2 : FILE_PATH_1); // The location of your PCM file
        File f2 = new File(currentPath == FILE_PATH_1 ? FILE_PATH_1 : FILE_PATH_2);
        lastSavePath = SAVE_PATH + "/" + name + ".wav";
        File saveFile = new File(lastSavePath); // The location where you want your WAV file
        File savePath = new File(SAVE_PATH);

        if (!savePath.exists()) {
            savePath.mkdirs();
        }
        try {
            // time은 MAX_time 보다 작아야함
            new PcmToWave(f1, f2, saveFile, time, mSampleRate, bytePerSec);
            Log.d(TAG, "SAVE SUCCESS");
            return "success";
        } catch (IOException e) {
            Log.d(TAG, e.toString());
            e.printStackTrace();
            return "fail";
        }
    }

    public void ErrorAndStop() {
        Toast.makeText(context, "Recording error try again", Toast.LENGTH_SHORT).show();
        onStop();
    }

    private void removeFile(String FilePath) {
        File file = new File(FilePath);
        if (file.exists()) {
            if (file.delete()) {
                Log.d(TAG, "파일삭제");
            } else {
                Log.d(TAG, "파일삭제 실패");
            }
        } else {
            Log.d(TAG, "파일 없음");
        }
    }
}
