---
# 这是文章的标题
title: Java 操作 PDF
# 这是页面的图标
icon: file-pdf
# 这是侧边栏的顺序
# order: 2
# 设置作者
author: god23bin
# 设置写作时间
date: 2023-04-18 13:14:13
# 一个页面可以有多个分类
category:
  - 随笔
# 一个页面可以有多个标签
tag:
  - Java
---

## Itext 是什么？

> Itext 官网：[https://itextpdf.com/](https://itextpdf.com/)

Itext 是一个开源的 Java-PDF 库

## Maven 依赖

```xml
<!-- pdf添加水印支持 -->
<dependency>
    <groupId>com.itextpdf</groupId>
    <artifactId>itextpdf</artifactId>
    <version>5.5.13</version>
</dependency>
<!-- 解决pdf中文水印无法添加的问题 -->
<dependency>
    <groupId>com.itextpdf</groupId>
    <artifactId>itext-asian</artifactId>
    <version>5.2.0</version>
</dependency>
```

## 编写工具类

```java
public class PdfUtil {
    // 完善工具类
}
```

### 创建 PDF 文档

```java
    /**
     * 创建一个简单的 PDF 文档，内容为 content
     *
     * @param filePath PDF 文档绝对路径，例如 D:\\pdf\\test.pdf
     * @param content  内容
     **/
    public static void createSimplePdfFile(String filePath, String content) {
        Document document = new Document();
        try {
            PdfWriter.getInstance(document, new FileOutputStream(filePath));
            document.open();
            document.add(new Paragraph(content));
        } catch (DocumentException | FileNotFoundException e) {
            e.printStackTrace();
        } finally {
            document.close();
        }
    }

    /**
     * 创建一个绿色背景 A4 大小的 PDF 文档，标题为 title，内容为 content
     *
     * @param filePath filePath PDF 文档绝对路径，例如 D:\\pdf\\test.pdf
     * @param title    标题
     * @param content  内容
     **/
    public static void createSimplePdfFile(String filePath, String title, String content) {
        // 创建矩形对象，设置页面大小为 A4
        Rectangle rectangle = new Rectangle(PageSize.A4);
        // 设置背景色为绿色
        rectangle.setBackgroundColor(BaseColor.GREEN);
        // 设置矩形 4 个边框的大小为 5
        rectangle.setBorder(5);

        Document document = new Document(rectangle);
        try {
            PdfWriter.getInstance(document, new FileOutputStream(filePath));
            document.addTitle(title);
            document.addAuthor("god23bin");
            document.addSubject("使用 iText 操作 PDF");
            document.addCreator("god23bin");
            // 设置左边距、右边距、上边距、下边距
            document.setMargins(10f, 20f, 30f, 40f);
            document.open();
            document.add(new Paragraph(content));
        } catch (DocumentException | FileNotFoundException e) {
            e.printStackTrace();
        } finally {
            document.close();
        }
    }
```

### 添加图片水印

```java
    /**
     * 给 PDF 中每一页都添加图片水印
     *
     * @param sourceFilePath 源 PDF 文档的绝对路径
     * @param targetFilePath 输出具有水印的 PDF 文档的绝对路径
     * @param imgUrl         水印图片
     **/
    public static void addImgWatermarking(String sourceFilePath, String targetFilePath, String imgUrl) {
        try {
            // 创建源 PDF 文档的 PdfReader 对象
            PdfReader pdfReader = new PdfReader(sourceFilePath);
            // 创建 PDF 印章对象，指定 PdfReader 对象和生成的具有印章的目标文件输出流
            PdfStamper pdfStamper = new PdfStamper(pdfReader, new FileOutputStream(targetFilePath));
            // 获取图片对象
            Image img = Image.getInstance(imgUrl);
            // 设置图片大小百分比
            img.scalePercent(50);
            // 设置图片绝对位置
            img.setAbsolutePosition(170, 320);

            // 设置填充和描边的透明度
            PdfGState pdfGState = new PdfGState();
            pdfGState.setFillOpacity(0.4f);
            pdfGState.setStrokeOpacity(0.3f);

            // 获取 PDF 总页数
            int numberOfPages = pdfReader.getNumberOfPages();
            // 每一页都添加上水印，遍历的下标需要从 1 开始
            PdfContentByte overContent;
            for (int i = 1; i < numberOfPages + 1; ++i) {
                // 获取 OverContent，能够将数据写到内容的上方，也就是覆盖在内容的上方
                overContent = pdfStamper.getOverContent(i);
                overContent.setGState(pdfGState);
                // 获取 UnderContent，同理，写在内容的下方
                // PdfContentByte underContent = pdfStamper.getUnderContent(i);
                overContent.addImage(img);
            }
            pdfStamper.close();
            pdfReader.close();
        } catch (IOException | DocumentException e) {
            e.printStackTrace();
        }
    }
```



### 添加文字水印

```java
    /**
     * 给 PDF 中每一页都添加文本水印
     *
     * @param sourceFilePath   源 PDF 文档的绝对路径
     * @param targetFilePath   输出具有水印的 PDF 文档的绝对路径
     * @param textWatermarking 文本水印，文本字符串
     **/
    public static void addTextWatermarking(String sourceFilePath, String targetFilePath, String textWatermarking) {
        try {
            PdfReader pdfReader = new PdfReader(sourceFilePath);
            PdfStamper pdfStamper = new PdfStamper(pdfReader, new FileOutputStream(targetFilePath));
            /*
              创建支持的基本字体对象
              BaseFont bf = BaseFont.createFont(BaseFont.HELVETICA, BaseFont.WINANSI, BaseFont.EMBEDDED);
              对于不支持的字体，比如中文，那么需要自己引入 itext-asian 库
            */
            BaseFont bfSupportChinese = BaseFont.createFont("STSongStd-Light", "UniGB-UCS2-H", BaseFont.NOT_EMBEDDED);

            // 设置填充和描边的透明度
            PdfGState pdfGState = new PdfGState();
            pdfGState.setFillOpacity(0.4f);
            pdfGState.setStrokeOpacity(0.3f);

            // 获取 PDF 总页数
            int numberOfPages = pdfReader.getNumberOfPages();
            // 每一页都添加上水印，遍历的下标需要从 1 开始
            for (int i = 1; i < numberOfPages + 1; ++i) {
                PdfContentByte overContent = pdfStamper.getOverContent(i);
                overContent.beginText();
                overContent.setGState(pdfGState);
                overContent.setFontAndSize(bfSupportChinese, 18);
                overContent.setTextMatrix(30, 30);
                // 设置水印文本对齐方式，参数：左对齐、水印文本、文本 x 轴坐标，文本 y 轴坐标，文本旋转角度
                overContent.showTextAligned(Element.ALIGN_LEFT, textWatermarking, 230, 430, 45);
                overContent.endText();
            }
            pdfStamper.close();
            pdfReader.close();
        } catch (IOException | DocumentException e) {
            e.printStackTrace();
        }
    }
```



### 测试

```java
    @Test
    void testTextWatermarking() {
        PdfUtil.addTextWatermarking("D:\\WordTemplate\\testconvert2.pdf",
                "D:\\WordTemplate\\testconvert2withTextWatermarking.pdf",
                "关注 god23bin");
    }

    @Test
    void testImgWatermarking() {
        PdfUtil.addImgWatermarking("D:\\WordTemplate\\testconvert2.pdf",
                "D:\\WordTemplate\\testconvert2withTextWatermarking.pdf",
                "D:\\WordTemplate\\watermark.png");
    }
```