interface RandomStringOptions {
  onlyLetters?: boolean
  onlyNumbers?: boolean
}

export class StringHelper {
  /**
   * Parse, map (with object) and replace value(s) in a string
   * @param toReplace The string containing the placeholders to replace
   * @param obj The object containing the value(s) to replace with
   * @example findAndMap('Hello %name%!', { '%name%': 'Louis' }) // Hello Louis!
   */
  public static findAndMap(
    toReplace: string,
    obj: Record<string, unknown>
  ): string {
    return toReplace.replace(
      new RegExp(Object.keys(obj).join('|'), 'gi'),
      (matched) => obj[matched] as string
    )
  }

  /**
   * Set first letter as uppercase
   * @param str String to transform
   * @example ucFirst('hello world') // Hello world
   */
  public static ucFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  /**
   * Transform snake_case string to PascalCase
   * @param str String to transform
   * @example snakeToPascalCase('hello_world') // HelloWorld
   */
  public static snakeToPascalCase(str: string): string {
    return str
      .split('_')
      .map((chunk) => this.ucFirst(chunk))
      .join('')
  }

  /**
   * Random string
   * @param length Length of the string
   * @param options Options
   * @example random(6) // 4f3a2b
   * @example random(6, { onlyLetters: true }) // abcdef
   * @example random(6, { onlyNumbers: true }) // 123456
   */
  public static random(length: number, options?: RandomStringOptions): string {
    options = options || {}
    options.onlyLetters = options.onlyLetters || false
    options.onlyNumbers = options.onlyNumbers || false

    if (options.onlyLetters) {
      return Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, '')
        .slice(0, length)
    }
    if (options.onlyNumbers) {
      // generate only numbers. do not use substr
      return Math.random()
        .toString()
        .replace(/[^0-9]+/g, '')
        .slice(0, length)
    }

    return Math.random().toString(36).slice(-length)
  }

  /**
   * Remove accents
   * @param str String to remove accents
   * @example removeAccents('éèà') // eea
   */
  public static removeAccents(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  }

  /**
   * Remove punctuation at the end of the string
   * @param str String to remove punctuation
   * @example removeEndPunctuation('Hello world!') // Hello world
   */
  public static removeEndPunctuation(str: string): string {
    const punctuations = ['.', ';', ':', '?', '!']
    const lastChar = str.charAt(str.length - 1)

    if (punctuations.includes(lastChar)) {
      return str.slice(0, -1)
    }

    return str
  }
}
