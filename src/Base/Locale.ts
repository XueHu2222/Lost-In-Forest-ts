/**
 * A class that represents a locale. It can be used to translate strings, format
 * dates and numbers and other locale specific tasks.
 *
 * To use this class, you need to create a JSON file in the `assets/lang`
 * directory of your project. The filename should be the RFC5646 language tag
 * of the language you want to support. For example, if you want to support
 * English, you should create a file named `en.json`. If you want to support
 * Dutch, you should create a file named `nl.json`. If you want to support
 * American English, you should create a file named `en-US.json`.
 *
 * The contents of the file should be a JSON object with key-value pairs. The
 * keys are the strings you want to translate. The values are the translations.
 * These keys might be translation stings in a default language, which is
 * actually preferred.
 *
 * @author dwaard
 *
 * No Software Warranty. User acknowledges and agrees that the use of the
 * Software is at user's sole risk. The Software and related documentation
 * are provided “AS IS” and without any warranty of any kind and Developer
 * EXPRESSLY DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
 * PARTICULAR PURPOSE.
 */
export default class Locale {
  private language: string;

  private strings: { [key: string]: string };

  /**
   * Construct a new object of this class
   *
   * @param language an RFC5646 language tag like 'nl' or 'en-US'
   */
  public constructor(language: string) {
    this.language = language;
    this.strings = JSON.parse(Locale.fetchLanguageFile(language));
  }

  /**
   * Translates a string
   *
   * @param input the string to translate
   * @param params the parameters, if needed
   * @returns the translated string or the input if a translation isn't found
   */
  public translate(input: string, params: { [key: string]: string } = {}): string {
    let translation: string = this.getTranslation(input);

    // Replace all parameters in the result
    Object.entries(params).forEach(([key, value]: [string, string]) => {
      translation = translation.replaceAll(`:${key}`, value);
    });

    return translation;
  }

  /**
   * Alias for the `translate` method
   *
   * @param input the string to translate
   * @param params the parameters, if needed
   * @returns the translated string or the input if a translation isn't found
   * @see {@link Locale.translate()}
   */
  public trans(input: string, params: { [key: string]: string } = {}): string {
    return this.translate(input, params);
  }

  /**
   * Alias for the `translate` method
   *
   * @param input the string to translate
   * @param params the parameters, if needed
   * @returns the translated string or the input if a translation isn't found
   * @see {@link Locale.translate()}
   */
  public t(input: string, params: { [key: string]: string } = {}): string {
    return this.translate(input, params);
  }

  /**
   * Translates a string with options pending on the given `count`.
   * Pluralization is a complex problem, as different languages have a variety
   * of complex rules for pluralization; This method can help you translate
   * strings differently based on pluralization rules that you define. Using a
   * `|` character, you may distinguish different rules based on the number,
   * for example:
   *
   * `'{0} There are no apples|{1} There is one apple|[2,*] There are :count apples’`
   *
   * @param input the string to translate
   * @param count the amount used for the choice
   * @returns the translated string or the input if a translation isn't found
   */
  public transChoice(input: string, count: number): string {
    let translation: string = this.getTranslation(input);

    const choices: string[] = translation.split('|');
    choices.forEach((choice: string) => {
      if (Locale.matchesChoice(choice, count)) {
        translation = Locale.extractChoiceText(choice);
      }
    });
    translation = translation.replaceAll(':count', `${count}`);

    return translation;
  }

  /**
   * Formats the given number in a locale specific format
   *
   * @param input the number to format
   * @returns a string representing the formatted number
   */
  public formatNumber(input: number): string {
    return input.toLocaleString(this.language);
  }

  /**
   * Formats the given Date object in a locale specific format
   *
   * @param input the Date to format
   * @returns a string representing the formatted Date
   */
  public formatDate(input: Date): string {
    return input.toLocaleString(this.language);
  }

  /**
   * Returns RFC5646 tags of the available languages of the browser
   *
   * @returns an array representing RFC5646 tags of the available languages
   *  of the browser
   */
  public static getAvailableBrowserLocales(): Array<string> {
    return [...navigator.languages];
  }

  /**
   * Returns the RFC5646 tag of the current browser language
   *
   * @returns the RFC5646 tag of the current browser language
   */
  public static getCurrentBrowserLocale(): string {
    return navigator.language;
  }

  /**
   * Helper method that returns the translation of the given input. If the
   * input is not found, the input itself is returned.
   *
   * @param input the input to translate
   * @returns the translation of the given input. If the
   * input is not found, the input itself is returned.
   */
  private getTranslation(input: string): string {
    // If the input is a property of the tsanslation strings object
    if (input in this.strings) {
      return this.strings[input]!;
    }
    // Return the input itself if no translation is found
    return input;
  }

  /**
   * Helper method. Checks if the specified choice matches the specified amount
   *
   * @param choice the choice string
   * @param amount the amount to be tested
   * @returns `true` if the amount matches the choice string
   */
  private static matchesChoice(choice: string, amount: number): boolean {
    if (choice[0] === '{') {
      // Find the index of the first } character after the { character
      const endIndex: number = choice.indexOf('}');
      return Number(choice.substring(1, endIndex)) === amount;
    }
    if (choice[0] === '[') {
      // Find the index of the first ] character after the [ character
      const endIndex: number = choice.indexOf(']');
      // Extract the substring between [ and ]
      const options: string[] = choice.substring(1, endIndex).split(',');
      return amount >= Number(options[0]) && (options[1] === '*' || amount < Number(options[1]));
    }
    return false;
  }

  /**
   * Helper method. Extracts the actual choice string
   *
   * @param str the input string to extract from
   * @returns the extracted string
   */
  private static extractChoiceText(str: string): string {
    let endIndex: number = str.indexOf('}');
    if (str[0] === '[') {
      endIndex = str.indexOf(']');
    }
    return str.substring(endIndex + 2);
  }

  /**
   * Fetches a language file based on the given tag
   *
   * @param tag the RFC5646 tag
   * @returns a JSON string representing a
   */
  private static fetchLanguageFile(tag: string) : string {
    // Load a language file that matches the chosen language
    let data: string = '';
    // split the language into RFC5646 subtags
    const subtags: string[] = tag.split('-');
    // Try to load the most specific language file, make more generic if needed
    while (subtags.length > 0 && data === '') {
      // Rejoin the subtags to create the filename
      const filename: string = subtags.join('-');
      data = Locale.loadTextFileViaHTTPRequest(`assets/lang/${filename}.json`);
      // Remove the last element from the array
      subtags.splice(-1, 1);
    }
    if (data === '') {
      data = '{}';
    }
    return data;
  }

  /**
   * Loads a file via a synchronous HTTP request.
   *
   * NOTE: the browser console will print a 404 error if the file
   * doesn't exist.
   *
   * @param url the URL of the text file
   * @returns a string representing the content of the text file or an empty
   *  string if the file doesn't exist
   */
  private static loadTextFileViaHTTPRequest(url: string): string {
    // Fetch the language file using an HTTP request
    const request: XMLHttpRequest = new XMLHttpRequest();

    request.open('GET', url, false); // `false` makes the request synchronous
    request.send(null);

    if (request.status === 200) {
      return request.responseText;
    }
    // Loading failed; return empty string
    return '';
  }
}
