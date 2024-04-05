import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

interface MyDocumentProps {
  language: string;
}

class MyDocument extends Document<MyDocumentProps> {
  static async getInitialProps(ctx: DocumentContext): Promise<any> {
    const initialProps = await Document.getInitialProps(ctx);
    const { req } = ctx;

    // Dil bilgisini al (bu örnekte, 'en' olarak varsayılan dil)
    const language = req ? req.headers['accept-language'] || 'az' : 'az';

    return { ...initialProps, language };
  }

  render(): JSX.Element {
    return (
      <Html lang={this.props.language}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
