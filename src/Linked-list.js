// @ts-check

/**
 * @template T
 * @typedef {Object} LLNode
 * @property {T | undefined} value
 * @property {LLNode<T> | undefined} next
 */

/**
 * @template T
 */
function LinkedList() {
  //HELPER FUNCTIONS
  /**
   * @private
   * @param {T} value
   * @returns {LLNode<T>} */
  function createNode(value) {
    return {
      value: value,
      next: undefined,
    };
  }

  /**
   * @private
   * @type {LLNode<T> | undefined} */
  let previousTail;

  //PRIVATE FUNCTIONS
  /**
   * @private
   *  @type {LLNode<T> | undefined} */
  let head = { value: undefined, next: undefined };

  /**
   * @private
   * @type {LLNode<T> | undefined} */
  let tail = { value: undefined, next: undefined };

  /** @private */
  let length = 0;

  //PUBLIC FUNCTIONS
  /**
   * @public
   * @param {T} value
   */
  function Append(value) {
    const node = createNode(value);
    if (length === 0) {
      tail = head = node;
    } else {
      previousTail = tail;
      if (!tail) return;
      tail.next = node;
      tail = node;
    }

    length++;
  }

  /**
   * @public
   * @param {T} value
   */
  function Prepend(value) {
    const node = createNode(value);
    if (length === 0) {
      head = tail = node;
    } else {
      node.next = head;
      head = node;
    }
    if (length > 0 && length <= 2) {
      previousTail = head;
    }
    length++;
  }

  /**
   * @public
   * @returns {number} */
  function Size() {
    return length;
  }

  /**
   * @public
   * @returns {LLNode<T> | undefined}
   */
  function Head() {
    return head;
  }

  /**
   * @public
   * @returns {LLNode<T> | undefined}
   */
  function Tail() {
    return tail;
  }

  /**
   * @public
   * @param {number} index
   * @returns {LLNode<T> | undefined}
   */
  function At(index) {
    //traverse the list using loop
    let current = head;
    if (index >= 0 && index < length) {
      for (let i = 0; i < index; i++) {
        current = current?.next;
      }
      return current;
    }
    return undefined;
  }

  /**
   * @param {number} index
   * @param {T} value
   */
  function InsertAt(index, value) {
    if (index === 0) {
      Prepend(value);
    } else if (index === length) {
      Append(value);
    } else {
      const node = createNode(value);
      let current = head;
      for (let i = 0; i < index - 1; i++) {
        current = current?.next;
      }
      const oldCurrentNext = current?.next;
      if (current?.next) current.next = node;
      node.next = oldCurrentNext;
      current = current?.next;
    }
  }

  /** @param {number} index */
  function RemoveAt(index) {
    if (index === 0) {
      head = head?.next;
    } else if (index === length) {
      Pop();
    } else {
      let current = head;
      for (let i = 0; i < index - 1; i++) {
        current = current?.next;
      }
      const newCurrentNext = current?.next?.next;
      if (current?.next) {
        current.next.next = undefined;
        current.next = undefined;
        current.next = newCurrentNext;
      }
    }
  }

  /** @public */
  function Pop() {
    if (length === 0) {
      return `Cannot empty an empty list`;
    }
    tail = previousTail;
    if (tail) tail.next = undefined;
    length--;
  }

  /**
   * @public
   * @param {T} value
   * @returns {boolean} */
  function Contains(value) {
    //traverse the list using loop
    let current = head;
    for (let i = 0; i < length; i++) {
      if (current?.value === value) return true;
      current = current?.next;
    }
    return false;
  }

  /**
   * @public
   * @param {T} value
   * @returns {number | undefined} */
  function Find(value) {
    //traverse the list using loop
    let current = head;
    for (let i = 0; i < length; i++) {
      if (current?.value === value) return i;
      current = current?.next;
    }
    return undefined;
  }

  /**
   * @public
   * @returns {string} - output should be (value) -> (value) ... */
  function ToString() {
    let current = head;
    let output = "";
    while (current) {
      output += `(${current.value}) -> `;
      current = current.next;
    }
    output += "null";
    return output;
  }

  return {
    Append,
    Prepend,
    Size,
    Head,
    Tail,
    At,
    InsertAt,
    RemoveAt,
    Pop,
    Contains,
    Find,
    ToString,
  };
}

const myLinkedList = LinkedList();
console.log(myLinkedList.Pop());
myLinkedList.Append(1);
myLinkedList.Prepend(0);
myLinkedList.Append(5);
myLinkedList.Append(7);
myLinkedList.Append(10);
myLinkedList.Append(4);
myLinkedList.Prepend(9);
myLinkedList.InsertAt(4, 2);
myLinkedList.RemoveAt(3);
console.log(myLinkedList.Size());
console.log(myLinkedList.ToString());
