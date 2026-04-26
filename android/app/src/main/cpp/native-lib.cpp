#include <jni.h>
#include <string>
#include <opencv2/opencv.hpp>

extern "C"
JNIEXPORT void JNICALL
Java_com_example_eyepro_MainActivity_processFrame(JNIEnv* env, jobject /* this */, jlong matAddrGray, jlong matAddrRgba) {
    // Convert the addresses to OpenCV Mat objects
    cv::Mat& mGray  = *(cv::Mat*)matAddrGray;
    cv::Mat& mRgba  = *(cv::Mat*)matAddrRgba;

    // Example processing: convert RGBA to grayscale (if needed)
    // cv::cvtColor(mRgba, mGray, cv::COLOR_RGBA2GRAY);

    // TODO: Add your eye detection or calibration logic here
    // For now, we just pass the frames through (no modification)
}
