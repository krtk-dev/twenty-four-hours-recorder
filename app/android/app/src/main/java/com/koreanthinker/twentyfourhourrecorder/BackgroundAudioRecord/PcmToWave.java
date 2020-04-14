package com.koreanthinker.twentyfourhourrecorder.BackgroundAudioRecord;

import android.util.Log;

import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class PcmToWave {
    private static final String TAG = "MainActivity";

    PcmToWave(final File rawFile1, final File rawFile2, final File waveFile, int time, int RECORDER_SAMPLERATE,
            int bytePerSec) throws IOException {
        Log.d(TAG, rawFile1.getName());
        Log.d(TAG, rawFile2.getName());
        int size1 = (int) rawFile1.length();
        int size2 = (int) rawFile2.length();
        if (size1 + size2 == 0) {
            throw new Error();
        }
        Log.d(TAG, "" + size1);
        Log.d(TAG, "" + size2);
        int totalSize = size1 + size2 >= bytePerSec * time ? bytePerSec * time : size1 + size2;
        Log.d(TAG, "" + totalSize);

        DataOutputStream output = null;
        try {
            output = new DataOutputStream(new FileOutputStream(waveFile));
            writeString(output, "RIFF"); // chunk id
            writeInt(output, 36 + totalSize); // chunk size
            writeString(output, "WAVE"); // format
            writeString(output, "fmt "); // subchunk 1 id
            writeInt(output, 16); // subchunk 1 size
            writeShort(output, (short) 1); // audio format (1 = PCM)
            writeShort(output, (short) 2); // number of channels
            writeInt(output, RECORDER_SAMPLERATE); // sample rate
            writeInt(output, bytePerSec); // byte rate
            writeShort(output, (short) (RECORDER_SAMPLERATE * 2)); // block align -> sampleRate * channel
            writeShort(output, (short) 16); // bits per sample
            writeString(output, "data"); // subchunk 2 id
            writeInt(output, totalSize); // subchunk 2 size

            // 파일 1과 파일 2를 합쳐서 모두 저장할 경우도 있지만 MAX_SIZE 이상으로 time을 설정할수 없기때문에 무시함
            if (size2 >= bytePerSec * time || size1 == 0) { // 파일 2만 사용할 경유
                output.write(file2ToBytes(rawFile2, size2, totalSize));
            } else { // 파일 12 둘다 사용할 경우
                output.write(fullyReadFileToBytes(rawFile1, rawFile2, size1, size2, totalSize));
            }
        } finally {
            if (output != null) {
                output.close();
            }
        }
    }

    private byte[] file2ToBytes(File f2, int size2, int totalSize) throws IOException {
        byte bytes2[] = new byte[size2];
        FileInputStream fis2 = new FileInputStream(f2);
        try {
            fis2.read(bytes2, 0, size2);
        } catch (IOException e) {
            throw e;
        } finally {
            fis2.close();
        }
        byte bytes[] = new byte[totalSize];
        System.arraycopy(bytes2, size2 - totalSize, bytes, 0, totalSize);

        return bytes;
    }

    private byte[] fullyReadFileToBytes(File f1, File f2, int size1, int size2, int totalSize) throws IOException {
        byte bytes1[] = new byte[size1];
        byte bytes2[] = new byte[size2];
        FileInputStream fis1 = new FileInputStream(f1);
        FileInputStream fis2 = new FileInputStream(f2);
        try {
            fis1.read(bytes1, 0, size1);
            fis2.read(bytes2, 0, size2);
        } catch (IOException e) {
            throw e;
        } finally {
            fis1.close();
            fis2.close();
        }
        byte bytes[] = new byte[totalSize];
        System.arraycopy(bytes1, size1 + size2 - totalSize, bytes, 0, totalSize - size2);
        System.arraycopy(bytes2, 0, bytes, totalSize - size2, size2);

        return bytes;
    }

    private void writeInt(final DataOutputStream output, final int value) throws IOException {
        output.write(value >> 0);
        output.write(value >> 8);
        output.write(value >> 16);
        output.write(value >> 24);
    }

    private void writeShort(final DataOutputStream output, final short value) throws IOException {
        output.write(value >> 0);
        output.write(value >> 8);
    }

    private void writeString(final DataOutputStream output, final String value) throws IOException {
        for (int i = 0; i < value.length(); i++) {
            output.write(value.charAt(i));
        }
    }
}
